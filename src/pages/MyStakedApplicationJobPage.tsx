import { Navigate, useParams } from "react-router-dom";
import { paths } from "src/pagesPaths";
import { Helmet } from "react-helmet";
import { useApplication, useStakedData } from "src/hooks/applications";
import JobDetails from "src/components/JobDetails";
import { useSetNavBarTitle } from "src/hooks/navbar";

const MyStakedApplicationJobPage = () => {
  const applicationId = useParams().applicationId ?? "";
  const stakedApplication = useStakedData(applicationId);
  const application = useApplication(applicationId);
  useSetNavBarTitle("My Stakes");

  if (!application) {
    throw new Error(`Application ${applicationId} not found`);
  }

  if (!stakedApplication) {
    return <Navigate to={paths.myStakedApplications.resolve()} />;
  }

  return (
    <div className="p-10 overflow-y-scroll">
      <Helmet>
        <title>Dorse - {application.jobAd.title}</title>
      </Helmet>

      <JobDetails
        application={application}
        stakedData={stakedApplication}
        goBackLink={paths.myStakedApplication.resolve(applicationId)}
      />
    </div>
  );
};

export default MyStakedApplicationJobPage;
