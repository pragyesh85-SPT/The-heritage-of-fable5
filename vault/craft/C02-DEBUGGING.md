# C02 — Debugging: The Master Craft

Debugging is where intelligence is most wasted by bad method. A mediocre mind with
discipline beats a brilliant one guessing.

## The prime directive
**The bug is always in something you believe is true.** Not in what you know is shaky —
you already checked that. When you're stuck, the fault hides inside a certainty. So the
unlock move is: write down every assumption in the failing path ("the request reaches
the server", "this env var is set", "this function is even being called", "the file I'm
editing is the file being run") and test them in order of MOST confident first. The one
you'd bet your life on — test that one first. That inversion feels wrong and works.

## The method (in order)
1. **Reproduce before theorizing.** A bug you can't trigger on demand can't be verified
   fixed. Shrink the reproduction: smallest input, fewest steps. Half the time, the act
   of shrinking reveals the cause by itself.
2. **Read the error. Actually read it.** The full text, the line numbers, the NESTED
   cause under the top-level wrapper. Most errors name their cause; we skim them because
   we already "know" what's wrong. The second sentence of a stack trace has solved more
   bugs than any theory.
3. **One hypothesis, one probe, smallest possible.** State the hypothesis in words
   ("the webhook never fires"), design the CHEAPEST observation that distinguishes
   true from false (one log line, one console query), run it, then believe the result —
   especially when it kills your favorite theory. Never fire three fixes at once: even
   if it works, you've learned nothing and shipped two superstitions.
4. **Bisect when lost.** No good hypothesis? Stop thinking, start halving: does the bug
   exist at the midpoint of the data flow? Of the commit history (git bisect)? Of the
   input? Each check halves the territory; ten checks search a thousand suspects.
   Bisection is what "systematic" actually means.
5. **When the fix doesn't fix it — stop.** A fix that "should have worked" and didn't
   means your MODEL of the system is wrong, not just the code. Revert, and go test
   assumptions (see prime directive). Stacking fix-on-fix on a wrong model digs the pit.

## The classic traps
- **Debugging the wrong layer:** UI shows wrong → check data → data wrong → check
  writer. Always walk to where the wrongness ENTERS; fixing where it's DISPLAYED
  creates a second bug.
- **The bug isn't where the crash is.** The crash is where bad state was finally
  noticed, often far downstream of where it was created. Trace the bad value backward.
- **"It's impossible" means a wrong assumption, 95%.** The compiler, the platform, the
  library are almost never broken. Say "then one of my beliefs is false — which?" and
  go enumerate.
- **Two bugs at once.** When symptoms are contradictory, stop forcing one theory to
  explain everything — test whether you have two independent problems. (Contradictory
  evidence is the SIGNATURE of two bugs.)
- **The fix that works but you don't know why:** do not accept it. Understand it or
  it returns wearing a different shirt.

## After every real bug: the 30-second autopsy
One line, written down: what was the false belief, and what question would have
exposed it in the first five minutes? That question joins your permanent repertoire.
This is how debugging skill actually compounds.
