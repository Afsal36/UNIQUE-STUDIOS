import ServiceDetail from '../../components/ServiceDetail';
import { serviceDetails } from '../../data/serviceDetails';

export default function GraphicDesigning() {
  const service = serviceDetails.find((item) => item.slug === 'graphic-design');
  return <ServiceDetail service={service} />;
}

