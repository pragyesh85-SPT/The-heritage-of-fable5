# W92 — Architecting a RAG System

Trigger: any "make the AI answer from our documents/data" request — support bots,
policy Q&A, product search with natural language, internal knowledge assistants.

## Step 0 — do you need RAG at all? (most projects don't)
- Corpus < ~200 docs / < ~500k tokens → just-in-time file loading (W81 pattern)
  or stuff-the-context beats a pipeline. No infra, no staleness.
- Questions are really lookups ("what's order 4413's status") → that's a database
  query with an LLM writing the query. RAG on structured data is a downgrade.
- Corpus changes hourly → the index staleness problem dominates; design ingestion
  first or reconsider.
RAG earns its complexity only when: large corpus + fuzzy questions + answers must
cite sources.

## The pipeline (build and evaluate each stage separately)
1. **Ingestion.** Chunk by semantic unit (heading/section/FAQ-item), never by
   fixed character count — mid-sentence chunks create answers no document says.
   Attach metadata to every chunk: source doc, section title, date, access level.
2. **Index.** Hybrid always: BM25/keyword + embeddings. Keyword catches exact
   terms (SKU codes, names, error strings) that embeddings blur; embeddings catch
   paraphrase that keywords miss. Metadata filters (date, product, tenant) run
   BEFORE similarity, not after.
3. **Retrieval.** Small top-k (5–10) then rerank, rather than top-50 stuffed in.
   Log every retrieval: query → chunks → used-or-not. This log is the debugging
   tool for everything later.
4. **Generation.** Citations mandatory — every claim maps to a chunk id. If
   retrieved chunks don't support an answer: say "not in the documents", never
   improvise. The refusal path is a feature; build and test it explicitly.
5. **Evaluation — built BEFORE the pipeline.** Write 20–50 golden questions with
   known source passages. Measure two numbers separately: retrieval hit rate
   (right chunk in top-k?) and answer faithfulness (answer supported by chunk?).
   When quality drops, these two tell you which half is broken — without them
   every fix is a guess.

## Failure catalog (diagnose in this order)
Wrong answers with confident tone → check retrieval log first; 80% of "the LLM
is hallucinating" is "the retriever fed it the wrong chunk". Answers citing
stale facts → ingestion isn't re-running on doc updates. Exact-term questions
failing → keyword half of hybrid is missing/broken. Good chunks retrieved but
ignored → too many chunks; cut k, rerank.

## Cost note
Embed once, retrieve forever — embedding cost is one-time per doc; generation is
per-query. Use a cheap model for generation with strict grounding (the chunks do
the knowing, the model does the reading) — this is the W82 principle applied.

## Failure this prevents
A support bot that invents refund policy; weeks lost tuning prompts when the
retriever was the broken half; RAG pipelines built for 40 documents.

## Linked
[[W81-CONTEXT-LOADING-PROTOCOL]] · [[W82-CHEAP-MODEL-LEVERAGE]] · [[W91-MEMORY-ARCHITECTURE]] · [[W62-GENERAL-RESEARCH-METHOD]] · [[C01-EPISTEMICS]]
