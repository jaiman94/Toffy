# Toffy App - Onboarding Flow Documentation

## Overview
This document describes the complete onboarding flow for new users of the Toffy dog training app. The flow consists of 8 sequential screens that collect user information, dog profile data, and behavioral assessments to generate a personalized training plan.

---

## Screen 1: Welcome/Landing Screen

**Purpose:** Initial app entry point with branding and authentication options

**Elements:**
- **Logo:** "toffy" with paw print replacing the 'o'
- **Tagline:** "I'm your calm in the chaos, always here when things get ruff. Ready to begin?"
- **Primary CTA:** "Register" button (orange, filled)
- **Secondary CTA:** "Login" button (white, outlined)
- **Play Button:** Purple circular button (likely intro video)
- **Mascot:** Illustrated golden retriever "Toffy" with orange collar and bow tie

**User Action:** Tap "Register" to begin onboarding

---

## Screen 2: Account Registration

**Purpose:** Collect user account information

**Header:** "Let's get your training adventure started!"

**Form Fields:**
1. **Name**
   - Placeholder: "What should I call you?"
   - Type: Text input
   - Required: Yes

2. **Email**
   - Placeholder: "Drop your email here"
   - Type: Email input
   - Required: Yes

3. **Create a password**
   - Placeholder: "One you'll remember"
   - Type: Password input (with visibility toggle icon)
   - Required: Yes

**Legal:**
- "By registering here you agree to the Terms and Conditions and Privacy Policy" (linked text)

**CTAs:**
- **Primary:** "Create my account" (orange button)
- **Alternative:** "Or skip ahead with one tap"
  - Google Sign-In button
- **Existing users:** "Already a part of our pack? Log In"

**Navigation:** Back arrow (top left)

**User Action:** Fill form and tap "Create my account" OR use Google Sign-In

---

## Screen 3: Dog Profile Setup

**Purpose:** Collect detailed information about the user's dog

**Header:** "Got a photo of your pup (Optional)"

**Form Fields:**

1. **Dog Photo**
   - Type: Image upload (optional)
   - Placeholder: Camera/gallery icon

2. **What is your pup's name?** *
   - Placeholder: "Dog's name"
   - Type: Text input
   - Required: Yes

3. **What breed is your [dog]?** *
   - Placeholder: "Start typing the breed name"
   - Type: Search/autocomplete input
   - Required: Yes

4. **When is your dog's birthday?**
   - Type: Date picker (DD / MM / YYYY format)
   - Alternative: Checkbox "I do not know my dog's age!"

5. **What is your dog's weight?** *
   - Type: Number input + Unit dropdown
   - Required: Yes

6. **Is your dog a boy or a girl?** *
   - Type: Radio buttons (Boy / Girl)
   - Required: Yes

7. **How did your dog join the family?**
   - (Visible but cut off in frame - likely dropdown or selection)

**Navigation:** "Back" link (top right)

**User Action:** Complete dog profile information and continue

---

## Screen 4: AI Chat Introduction

**Purpose:** Introduce user to Toffy AI and begin conversational onboarding

**Header:** "Toffy AI" with paw icon

**Chat Flow:**

1. **Toffy (AI):**
   > "Hi mayur 👋
   > I'm Toffy, your new training buddy. What's the first thing you'd like to discuss about max's training?"

2. **User Response Options:**
   - Quick reply chip: "Potty training" (user selected this)

3. **Toffy (AI):**
   > "Hi Mayur! Potty training is such an important step. How's Max doing with it so far? Is he having any specific challenges, like accidents in the house or not going outside?"

4. **User Response:**
   - Quick reply: "Yes"

5. **Toffy (AI):**
   > "Great to hear that Max is making progress! At 18 years old, he must have quite a personality. Has he had any previous training experiences, or are you starting fresh with him?"

6. **User Response:**
   - Quick reply: "Fresh"

**UI Elements:**
- Chat bubbles (AI: white/left, User: orange/right)
- User avatar icon on right side
- Typing indicator: "Toffy is typing..."
- Text input field: "Type your message..."

**User Action:** Engage in conversation about training goals

---

## Screen 5: Assessment Introduction Modal

**Purpose:** Transition from chat to structured questionnaire

**Modal Overlay Content:**

**Header:** "Let's Get to Know max Better!"

**Body Text:**
> "Answer 21 questions to help me understand max's habits and needs. So I can suggest the best training plans for max"

**CTA:** "Start Questions" (orange button)

**Background:** Chat continues behind modal with Toffy asking:
> "Thanks for sharing, Mayur! Starting fresh can be a great opportunity to build good habits. What's your biggest concern with Max's potty training right now? Is it more about him not going outside or having accidents indoors?"

**User Action:** Tap "Start Questions" to begin assessment

---

## Screen 6: Behavioral Assessment Questions

**Purpose:** Collect specific behavioral data through interactive questions

**Progress Indicator:** Dot navigation at top (shows multiple questions)

**Example Question:**

**Title:** "Leaders Eat First"

**Video Option:** "Watch Video" button (orange outlined)

**Illustration:** Shows family at dining table with dog sitting nearby, with "NO FEEDING" instruction and X mark

**Question:** "Have you ever fed max scraps from the table while you were eating?"

**Response Options:**
- "No" button (outlined)
- "Yes" button (outlined)

**Navigation:** Back arrow (bottom left)

**Note:** This is question format for the 21-question assessment. Questions cover various behavioral scenarios with visual aids and binary or multiple choice responses.

**User Action:** Answer each question in the sequence

---

## Screen 7: Processing Screen

**Purpose:** Transition state while AI processes assessment data

**Elements:**
- Toffy logo (small, top center)
- **Message:** "Thanks for sharing, give me a moment while I process this information..."
- **Illustration:** Toffy mascot in thinking pose (paw on chin)
- Soft purple/lavender background accents

**User Action:** Wait for processing to complete (automatic transition)

---

## Screen 8: Diagnosis/Results Screen

**Purpose:** Present personalized assessment results and training recommendations

**Header:** "Diagnosis"

**Subheader:** "Max's Journey to Greatness!"

**Visual Elements:**
- Dog photo (from profile)
- Circular progress/score indicator (orange and green segments)
- Decorative stars and sparkles

**CTAs:**
- "View your strengths!" (outlined button)

**Summary Stats:**
- "2 Opportunities to Improve"

**Detailed Results Section:**

**"Here's what's holding you back:"**
- Lack of Formal Training
- Low Weight

**User Action:** Review diagnosis, tap to view strengths or improvement areas, proceed to main app/training plans

---

## Flow Summary

| Step | Screen | Primary Action |
|------|--------|----------------|
| 1 | Welcome | Tap Register |
| 2 | Registration | Create account or Google Sign-In |
| 3 | Dog Profile | Enter dog details |
| 4 | AI Chat | Discuss training goals |
| 5 | Assessment Intro | Start 21 questions |
| 6 | Questions | Answer behavioral questions |
| 7 | Processing | Wait for analysis |
| 8 | Diagnosis | View personalized results |

---

## Key Observations

1. **Personalization:** The app uses the dog's name (Max) and owner's name (Mayur) throughout
2. **Conversational UI:** Combines traditional forms with AI chat interface
3. **Visual Learning:** Assessment questions include illustrations and optional videos
4. **Progressive Disclosure:** Information is collected in digestible steps
5. **21 Questions:** Structured assessment provides data for AI-powered recommendations
6. **Gamification Elements:** Progress indicators, "journey to greatness" framing, strengths/opportunities language

---

*Document generated from onboarding flow GIF analysis*
*Source: On boarding flow gif (2).gif*
