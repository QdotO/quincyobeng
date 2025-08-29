export interface ChoiceOption {
  id: string
  text: string
  immediateEffect: string
  rationale: string
  impact: {
    userSatisfaction: number // -2 to +2
    businessValue: number // -2 to +2
    technicalHealth: number // -2 to +2
    timeline: number // -2 to +2 (negative = faster)
  }
}

export interface SimulatorStep {
  id: string
  question: string
  context: string
  options: ChoiceOption[]
}

export const simulatorData: SimulatorStep[] = [
  {
    id: 'timeline',
    question: 'Your team has been working on a new collaboration feature for 3 months. The deadline is tomorrow, but you just discovered a critical bug that affects 20% of users.',
    context: 'The feature is meant to improve team productivity by 30% according to early testing.',
    options: [
      {
        id: 'delay',
        text: 'Delay the launch by 1 week to fix the bug',
        immediateEffect: 'Users wait longer, but get a stable experience',
        rationale: 'Quality over speed. A buggy launch can erode trust faster than a short delay.',
        impact: { userSatisfaction: 1, businessValue: 0, technicalHealth: 2, timeline: -1 }
      },
      {
        id: 'ship-with-warning',
        text: 'Ship with a warning banner and fix within 24 hours',
        immediateEffect: 'Immediate launch, but users see the issue briefly',
        rationale: 'Balance speed with transparency. Most users won\'t be severely impacted.',
        impact: { userSatisfaction: 0, businessValue: 1, technicalHealth: -1, timeline: 2 }
      },
      {
        id: 'rollback',
        text: 'Roll back to the previous version entirely',
        immediateEffect: 'No new feature, but guaranteed stability',
        rationale: 'When in doubt, protect the core experience. Better to iterate than break.',
        impact: { userSatisfaction: -1, businessValue: -2, technicalHealth: 1, timeline: 1 }
      }
    ]
  },
  {
    id: 'scope',
    question: 'The feature is too complex. You can either ship a minimal version or cut features to make it simpler.',
    context: 'Full version has 8 sub-features, minimal has 3 core ones. Both would satisfy the main user need.',
    options: [
      {
        id: 'minimal-viable',
        text: 'Ship the minimal version and iterate based on feedback',
        immediateEffect: 'Faster launch, room to improve based on real usage',
        rationale: 'Start with the core value proposition. You can always add more later.',
        impact: { userSatisfaction: 0, businessValue: 1, technicalHealth: 1, timeline: 1 }
      },
      {
        id: 'cut-features',
        text: 'Cut 3 features to make the remaining 5 more polished',
        immediateEffect: 'More complete experience, but delayed launch',
        rationale: 'Quality matters for user adoption. Half-baked features confuse users.',
        impact: { userSatisfaction: 1, businessValue: 0, technicalHealth: 0, timeline: -1 }
      },
      {
        id: 'all-or-nothing',
        text: 'Push through and ship everything as planned',
        immediateEffect: 'Complete feature set, but rushed implementation',
        rationale: 'Deliver on promises. Users expect what was committed.',
        impact: { userSatisfaction: -1, businessValue: 0, technicalHealth: -2, timeline: 0 }
      }
    ]
  },
  {
    id: 'feedback',
    question: 'Beta users are giving mixed feedback. Half love it, half find it confusing. You have 2 days before launch.',
    context: 'The confusion seems to stem from the new UI patterns that differ from your existing design system.',
    options: [
      {
        id: 'iterate-quickly',
        text: 'Make targeted UI changes based on the feedback',
        immediateEffect: 'Better user experience, but tight timeline',
        rationale: 'User feedback is gold. Small changes can make a big difference.',
        impact: { userSatisfaction: 2, businessValue: 1, technicalHealth: 0, timeline: -1 }
      },
      {
        id: 'stick-to-plan',
        text: 'Stick with the original design and provide better onboarding',
        immediateEffect: 'Consistent with vision, but users still confused initially',
        rationale: 'Trust your design process. Good onboarding can bridge the gap.',
        impact: { userSatisfaction: 0, businessValue: 0, technicalHealth: 0, timeline: 1 }
      },
      {
        id: 'survey-more',
        text: 'Run a quick survey to understand the confusion better',
        immediateEffect: 'More data, but delayed decision-making',
        rationale: 'Don\'t assume you understand the problem. Gather evidence.',
        impact: { userSatisfaction: 0, businessValue: 0, technicalHealth: 0, timeline: -2 }
      }
    ]
  },
  {
    id: 'technical-debt',
    question: 'The implementation requires either a quick hack that works now or a proper architectural change that takes longer.',
    context: 'The hack will work for 80% of cases but create maintenance issues. The proper solution is future-proof.',
    options: [
      {
        id: 'proper-solution',
        text: 'Take the time to implement it properly',
        immediateEffect: 'Slower launch, but sustainable long-term',
        rationale: 'Technical debt compounds. Better to do it right the first time.',
        impact: { userSatisfaction: 0, businessValue: 0, technicalHealth: 2, timeline: -2 }
      },
      {
        id: 'strategic-hack',
        text: 'Use the hack with a plan to refactor in the next sprint',
        immediateEffect: 'Fast launch, but committed to future refactoring',
        rationale: 'Sometimes you need to ship to learn. Just don\'t forget to clean up.',
        impact: { userSatisfaction: 0, businessValue: 1, technicalHealth: -1, timeline: 2 }
      },
      {
        id: 'compromise',
        text: 'Find a middle-ground solution that\'s 80% proper',
        immediateEffect: 'Balanced approach, acceptable quality and timeline',
        rationale: 'Perfection is the enemy of good. Find the sweet spot.',
        impact: { userSatisfaction: 1, businessValue: 0, technicalHealth: 0, timeline: 0 }
      }
    ]
  },
  {
    id: 'marketing',
    question: 'How do you announce this feature to your users and market?',
    context: 'You have a user base of 10K active users. The feature could be a competitive advantage.',
    options: [
      {
        id: 'soft-launch',
        text: 'Soft launch to 10% of users, gather feedback, then expand',
        immediateEffect: 'Lower risk, but slower market penetration',
        rationale: 'Control the narrative. Better to have a great launch than a big one.',
        impact: { userSatisfaction: 1, businessValue: 0, technicalHealth: 0, timeline: 0 }
      },
      {
        id: 'big-announcement',
        text: 'Big marketing push with blog post, email, and social media',
        immediateEffect: 'Maximum visibility, but higher expectations',
        rationale: 'Create momentum. Users love being part of something new.',
        impact: { userSatisfaction: 0, businessValue: 2, technicalHealth: 0, timeline: 0 }
      },
      {
        id: 'user-driven',
        text: 'Let power users discover and spread the word organically',
        immediateEffect: 'Authentic adoption, but unpredictable timeline',
        rationale: 'Word of mouth is the best marketing. Let users be your advocates.',
        impact: { userSatisfaction: 1, businessValue: 1, technicalHealth: 0, timeline: 1 }
      }
    ]
  }
]

export const calculateFinalScore = (choices: string[]) => {
  const impacts = choices.map((choice, index) => {
    const step = simulatorData[index]
    const option = step.options.find(opt => opt.id === choice)
    return option?.impact || { userSatisfaction: 0, businessValue: 0, technicalHealth: 0, timeline: 0 }
  })

  const totals = impacts.reduce(
    (acc, impact) => ({
      userSatisfaction: acc.userSatisfaction + impact.userSatisfaction,
      businessValue: acc.businessValue + impact.businessValue,
      technicalHealth: acc.technicalHealth + impact.technicalHealth,
      timeline: acc.timeline + impact.timeline
    }),
    { userSatisfaction: 0, businessValue: 0, technicalHealth: 0, timeline: 0 }
  )

  return {
    ...totals,
    overall: Math.round((totals.userSatisfaction + totals.businessValue + totals.technicalHealth - totals.timeline) / 4)
  }
}

export const getStrategySummary = (score: ReturnType<typeof calculateFinalScore>) => {
  if (score.overall >= 2) return 'Balanced Innovator'
  if (score.userSatisfaction >= 3) return 'User-First Champion'
  if (score.businessValue >= 3) return 'Business Driver'
  if (score.technicalHealth >= 3) return 'Technical Steward'
  if (score.timeline <= -2) return 'Speed Demon'
  return 'Pragmatic Leader'
}