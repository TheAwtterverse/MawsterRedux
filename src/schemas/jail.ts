import mongoose, { Document, Schema } from 'mongoose';
import { reqString } from './types';

export interface IJail extends Document {
  discordId: string,
}


const JailSchema: Schema = new Schema({
  discordId: reqString,
});

export default mongoose.model<IJail>('jails', JailSchema);
