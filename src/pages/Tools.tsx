
import { Helmet } from 'react-helmet';
import SidebarTools from '@/components/tools/SidebarTools';

const Tools = () => {
  return (
    <>
      <Helmet>
        <title>Developer Tools | Mahendran</title>
        <meta
          name="description"
          content="100+ powerful tools for mobile app developers. Format JSON, test regex patterns, convert colors, and more."
        />
      </Helmet>

      <SidebarTools />
    </>
  );
};

export default Tools;
