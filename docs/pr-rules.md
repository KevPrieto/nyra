EYLA — Pull Request Rules
System-First Product Guardrails

This document defines the non-negotiable rules that every Pull Request in EYLA must satisfy.
If a PR violates any single rule, it must not be merged, regardless of visual appeal or implementation quality.

1. Core Rule

EYLA optimizes cognitive orientation, not productivity metrics.

Any change that:

increases cognitive load,

introduces parallel focus,

or forces the user to manage the system,

does not belong in EYLA.

2. Mandatory Mental Tokens (Hard Constraints)

Every PR must comply with all tokens below.

2.1 AXIS = ONE

 The change preserves a single dominant vertical axis.

 No UI element competes horizontally with the main content.

 No floating panels or lateral growth without explicit system justification.

❌ Reject PR if: the layout feels like a board, canvas, or dashboard.

2.2 FOCUS = ONE_AT_A_TIME

 Only one step is visually dominant at any moment.

 Focus is not duplicated in sidebar, headers, or secondary panels.

 The system decides focus, not the user.

❌ Reject PR if: the user can meaningfully act on more than one step at once.

2.3 PAST = CALM

 Completed steps remain visible.

 Completed steps lose energy but are not disabled.

 No aggressive visual treatment for “done” states.

❌ Reject PR if: the past feels punished, hidden, or noisy.

2.4 FUTURE = SILENT

 Future steps are visible but passive.

 No strong CTA or hover for future actions.

 Future content reassures, it does not attract.

❌ Reject PR if: the user wants to interact with something that is not yet relevant.

2.5 FORM = STABLE

 Components keep consistent geometry across states.

 State is communicated through emphasis, not shape changes.

 No surprise layout shifts.

❌ Reject PR if: the UI “dances” when state changes.

2.6 PATH = PERCEIVED, NOT DRAWN

 No literal long paths, roads, or trajectories.

 Progress is conveyed through rhythm, spacing, and hierarchy.

 Removing decorative connectors does not break understanding.

❌ Reject PR if: users follow lines instead of content.

2.7 CTA = HIERARCHICAL

 There is at most one primary CTA per screen.

 Secondary actions are visually subordinate.

 Destructive actions are discreet.

❌ Reject PR if: two actions compete for attention.

2.8 COPY = GUIDANCE

 Every screen answers “What should I do now?”

 Copy is functional, not poetic.

 Microcopy is calm and human.

❌ Reject PR if: text exists only to sound clever.

2.9 EMOTION = CALM_CLARITY

 No urgency, pressure, or dopamine loops.

 Animations are slow and subtle.

 Nothing demands attention without user intent.

❌ Reject PR if: the UI feels demanding or stressful.

2.10 SYSTEM_FIRST

 The change strengthens system coherence.

 The change does not introduce ad-hoc exceptions.

 Long-term clarity is prioritized over short-term appeal.

❌ Reject PR if: the feature only “looks cool”.

3. Sidebar-Specific Rules
SIDEBAR = MEMORY

 Sidebar does not contain critical actions.

 Sidebar never duplicates roadmap focus.

 Sidebar informs context, it does not control flow.

❌ Reject PR if: meaningful work can happen only in the sidebar.

TIMELINE = ANTICIPATION

 Timeline items are read-only.

 Timeline never changes focus.

 Timeline communicates continuity, not obligation.

❌ Reject PR if: the timeline behaves like a task list or calendar.

CAPTURE = ZERO_FRICTION

 Capturing an idea requires no categorization.

 Capture is faster than deciding what to do with the idea.

 Capture does not interrupt the main flow.

❌ Reject PR if: capturing creates new decisions.

4. Reminder Rules (Critical)
REMINDER = INTENT, NOT TASK

 Reminders represent conscious future intention.

 Reminders are never mandatory tasks.

 Reminders are system-assisted, not user-managed.

Notification Rules

 Notifications are invitations, not alarms.

 Ignoring or dismissing a reminder has no penalty.

 Reminders close automatically when progress resumes.

❌ Reject PR if: reminders introduce guilt, urgency, or management overhead.

Forbidden Reminder Origins

A reminder must never originate from:

standalone tasks

classic to-do lists

metrics or dashboards

artificial deadlines

generic checklists

settings or configuration

passive navigation

❌ Immediate rejection if violated.

5. Micro-Interaction Rules
MOTION = RESPONSE_ONLY

 Nothing animates without explicit user action.

FEEDBACK = WHISPER

 Feedback is subtle and non-celebratory.

INTERACTION = OPTIONAL

 Sidebar interactions are always opt-in.

❌ Reject PR if: motion or feedback seeks attention by itself.

6. Technical Acceptance Checklist (MVP Gate)

A PR can be merged only if all conditions below are true:

Orientation

 User understands what to do next without documentation.

 Only one step is visually dominant.

Layout

 Single vertical axis is preserved.

 No unpredictable layout shifts.

Sidebar

 Sidebar never competes with main content.

 No critical action exists only in the sidebar.

Timeline

 Timeline is passive and read-only.

 Timeline does not trigger navigation or focus changes.

Reminders

 Reminders can be created without dates.

 Notifications feel calm and human.

 Dismissal has no negative consequence.

Emotional Integrity

 No more than one dominant CTA per screen.

 No animation triggers without user action.

 The UI feels calm, not demanding.

7. Final Rule

If a PR technically works but violates EYLA’s cognitive contract,
it must not be merged.

EYLA does not impress.
EYLA sustains.

Usage

This file must be consulted before opening and before merging any PR.