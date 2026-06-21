const activities = Array.from({ length: 20 }, (_, i) => ({
tenantId: "raj111",
actorId: `${i + 21}`,
actorName: `Sixteen ${i + 21}`,
type: "ACTIVITY",
entityId: i + 21,
metadata: {
title: `Activity ${i + 21}`,
description: `User ${i + 21} performed an activity on June 18.`,
},
createdAt: "2026-06-16T10:00:00.000Z",
}));

console.log(JSON.stringify(activities, null, 2));
