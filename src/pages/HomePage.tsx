import { Helmet } from "react-helmet";
import ApplicationStakeCard from "src/components/ApplicationStakeCard";
import { useApplications } from "src/hooks/applications";
import { useSetNavBarTitle } from "src/hooks/navbar";
import { paths } from "src/pagesPaths";

const HomePage = () => {
  const applications = useApplications();
  useSetNavBarTitle("Home");

  return (
    <div className="p-10 flex flex-col gap-6 h-full overflow-y-scroll">
      <Helmet>
        <title>Dorse - Home</title>
      </Helmet>

      <h1 className="text-3xl">Applications</h1>
      <div className="grid grid-cols-2 gap-3">
        {applications.map((application) => (
          <ApplicationStakeCard
            key={application.id}
            application={application}
            goToLink={paths.application.resolve(application.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
