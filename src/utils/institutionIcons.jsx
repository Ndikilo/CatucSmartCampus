import {
  School as SchoolIcon,
  Public as PublicIcon,
  Computer as ComputerIcon,
  Engineering as EngineeringIcon,
  MedicalServices as MedicalIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const getInstitutionIcon = (institutionId, fontSize = 'medium') => {
  const style = { fontSize };
  
  switch(institutionId) {
    case 'catuc':
      return <SchoolIcon style={style} />;
    case 'uba':
      return <PublicIcon style={style} />;
    case 'npuib':
      return <EngineeringIcon style={style} />;
    case 'smu':
      return <SchoolIcon style={style} />;
    case 'ict':
      return <ComputerIcon style={style} />;
    case 'guest':
      return <PersonIcon style={style} />;
    default:
      return <SchoolIcon style={style} />;
  }
};

export { getInstitutionIcon };
