import ServiceDetail from '../../components/ServiceDetail';
import { serviceDetails } from '../../data/serviceDetails';

export default function DigitalMarketing() {
  const service = serviceDetails.find((item) => item.slug === 'digital-marketing');
  return <ServiceDetail service={service} />;
}
