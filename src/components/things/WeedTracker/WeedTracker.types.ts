type EventType = 'bought' | 'consumed'

type Event = {
  name: string
  eventType: EventType
  timestamp: Date
  amount: number
}

export type { Event, EventType}