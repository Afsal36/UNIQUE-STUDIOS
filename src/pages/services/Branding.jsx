import ServiceDetail from '../../components/ServiceDetail';
import { serviceDetails } from '../../data/serviceDetails';

export default function Branding() {
  const service = serviceDetails.find((item) => item.slug === 'branding');
  return <ServiceDetail service={service} />;
}
