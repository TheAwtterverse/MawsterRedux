import mongoose, { Document, Schema } from 'mongoose';
import { reqString } from './types';

export interface ISetting extends Document {
  name: string,
  value: any,
}

const SettingSchema: Schema = new Schema({
  name: reqString,
  value: { type: Schema.Types.Mixed, required: true },
});

export default mongoose.model<ISetting>('settings', SettingSchema);
