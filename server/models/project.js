import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    default: '',
  },
  css: {
    type: String,
    default: '',
  },
  description :{
    type : String,
    default : ''
  }

}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
//const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
//export default Project;
