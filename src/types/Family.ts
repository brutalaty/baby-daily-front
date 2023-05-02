import Adult from './Adult';
import Child from './Child';

interface Family {
  id: number;
  name: string;
  created_at: string;
  adults: Adult[];
  children: Child[];
}

export default Family;
