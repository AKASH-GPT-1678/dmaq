type Metadata = {
  title: string;
  description: string;
};

export type Activity = {
  _id: string;
  tenantId: string;
  actorId: string;
  actorName: string;
  type: string;
  entityId: string;
  metadata: Metadata;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type ActivityResponse = {
  data : Activity[];
  lastTimestamp : Date
}