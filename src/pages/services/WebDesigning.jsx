import ServiceDetail from '../../components/ServiceDetail';
import { serviceDetails } from '../../data/serviceDetails';

export default function WebDesigning() {
  const service = serviceDetails.find((item) => item.slug === 'web-design');
  return <ServiceDetail service={service} />;
}

