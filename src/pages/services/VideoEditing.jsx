import ServiceDetail from '../../components/ServiceDetail';
import { serviceDetails } from '../../data/serviceDetails';

export default function VideoEditing() {
  const service = serviceDetails.find((item) => item.slug === 'video-editing');
  return <ServiceDetail service={service} />;
}
