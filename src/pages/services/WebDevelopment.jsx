import ServiceDetail from '../../components/ServiceDetail';
import { serviceDetails } from '../../data/serviceDetails';

export default function WebDevelopment() {
  const service = serviceDetails.find((item) => item.slug === 'web-development');
  return <ServiceDetail service={service} />;
}
