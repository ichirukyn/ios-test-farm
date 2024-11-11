import { ITask } from "@/types"

export const dailyTasks = [
    {
        "id": "66eaed2a788bb5f0875ee15a",
        "status": "PENDING",
        "progress": 0,
        "createdAt": "2024-09-18T15:09:30.115Z",
        "updatedAt": "2024-09-18T15:09:30.115Z",
        "finishedAt": null,
        "templateTask": {
            "id": "66eae65fdcee2158217ebc23",
            "title": "Daily baunty",
            "description": null,
            "type": "DAILY_BAUNTY",
            "baunty": 150,
            "bonus": 30,
            "target": null,
            "content": null,
            "navigate": null,
            "expiresAt": null,
            "createdAt": "2024-09-18T14:40:31.869Z",
            "updatedAt": "2024-09-18T14:40:31.869Z",
            "isDaily": true
        }
    },
    {
        "id": "66eaed36788bb5f0875ee15c",
        "templateTaskId": "66eae66bdcee2158217ebc25",
        "playerId": "66e7075674c9336a3e4098c2",
        "status": "PENDING",
        "progress": 0,
        "createdAt": "2024-09-18T15:09:30.117Z",
        "updatedAt": "2024-09-18T15:09:30.117Z",
        "finishedAt": null,
        "templateTask": {
            "id": "66eae66bdcee2158217ebc25",
            "title": "Daily minigame",
            "description": null,
            "type": "DAILY_MINIGAME",
            "baunty": null,
            "bonus": null,
            "target": null,
            "content": null,
            "navigate": null,
            "expiresAt": null,
            "createdAt": "2024-09-18T14:40:31.869Z",
            "updatedAt": "2024-09-18T14:40:31.869Z",
            "isDaily": true
        }
    },
] as unknown as ITask[]

export const allTasks = [
    {
        "id": "66eaedfe22203b5676e002fb",
        "templateTaskId": "66eae66bdcee2158217ebc27",
        "playerId": "66e7075674c9336a3e4098c2",
        "status": "PENDING",
        "progress": 0,
        "createdAt": "2024-09-18T15:13:02.377Z",
        "updatedAt": "2024-09-18T15:13:02.377Z",
        "finishedAt": null,
        "templateTask": {
            "id": "66eae66bdcee2158217ebc27",
            "title": "Invite count",
            "description": null,
            "type": "INVITE_COUNT",
            "baunty": 2000,
            "bonus": null,
            "target": 3,
            "content": null,
            "navigate": null,
            "expiresAt": null,
            "createdAt": "2024-09-18T14:40:43.911Z",
            "updatedAt": "2024-09-18T14:40:43.911Z",
            "isDaily": false
        }
    },
    {
        "id": "66eaedfe22203b5676e002fc",
        "templateTaskId": "66eae66bdcee2158217ebc26",
        "playerId": "66e7075674c9336a3e4098c2",
        "status": "PENDING",
        "progress": 0,
        "createdAt": "2024-09-18T15:13:02.378Z",
        "updatedAt": "2024-09-18T15:13:02.378Z",
        "finishedAt": null,
        "templateTask": {
            "id": "66eae66bdcee2158217ebc26",
            "title": "Invite count",
            "description": null,
            "type": "SUBSCRIBE_CHANNEL",
            "baunty": 2000,
            "bonus": null,
            "target": null,
            "content": "",
            "navigate": "",
            "expiresAt": null,
            "createdAt": "2024-09-18T14:40:43.911Z",
            "updatedAt": "2024-09-18T14:40:43.911Z",
            "isDaily": false
        }
    }
] as unknown as ITask[]