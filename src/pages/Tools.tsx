
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

      <div className="min-h-screen pt-16">
        <SidebarTools />
      </div>
    </>
  );
};

export default Tools;
