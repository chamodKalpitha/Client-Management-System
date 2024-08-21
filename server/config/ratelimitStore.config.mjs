// mongoose-store.js

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const rateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  hits: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RateLimit = model("RateLimit", rateLimitSchema);

class MongooseStore {
  constructor({ uri, prefix = "rl_" }) {
    this.prefix = prefix;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async init(options) {
    this.windowMs = options.windowMs;
  }

  prefixKey(key) {
    return `${this.prefix}${key}`;
  }

  async get(key) {
    const prefixedKey = this.prefixKey(key);
    const record = await RateLimit.findOne({ key: prefixedKey });

    if (!record) {
      return undefined;
    }

    const resetTime = new Date(record.createdAt.getTime() + this.windowMs);
    return {
      totalHits: record.hits,
      resetTime,
    };
  }

  async increment(key) {
    const prefixedKey = this.prefixKey(key);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.windowMs);

    const record = await RateLimit.findOneAndUpdate(
      { key: prefixedKey },
      {
        $setOnInsert: { key: prefixedKey, createdAt: now, expiresAt },
        $inc: { hits: 1 },
      },
      { upsert: true, new: true }
    );

    const resetTime = new Date(record.createdAt.getTime() + this.windowMs);

    return {
      totalHits: record.hits,
      resetTime,
    };
  }

  async decrement(key) {
    const prefixedKey = this.prefixKey(key);
    await RateLimit.findOneAndUpdate(
      { key: prefixedKey },
      { $inc: { hits: -1 } }
    );
  }

  async resetKey(key) {
    const prefixedKey = this.prefixKey(key);
    await RateLimit.deleteOne({ key: prefixedKey });
  }

  async resetAll() {
    await RateLimit.deleteMany({});
  }
}

export default MongooseStore;
