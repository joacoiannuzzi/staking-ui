import Img from "react-cool-img";
import { Link } from "react-router-dom";
import jobPlaceholderImage from "src/images/jobPlaceholder.jpeg";
import { ReactComponent as BackArrowIcon } from "src/images/backArrow.svg";
import {
  JobAdForStaker,
  JobApplicationForStaker,
  StakedData,
} from "src/types/models";
import StakeModal from "src/modals/StakeModal";
import UnstakeModal from "src/modals/UnstakeModal";
import { useGetStakeModalIsConfirmed } from "src/hooks/stakeModal";

const JobDetails = (props: {
  application: JobApplicationForStaker;
  stakedData: StakedData | undefined;
  goBackLink: string;
}) => {
  const isConfirmedModal = useGetStakeModalIsConfirmed();

  const application = props.application;
  const stakedData = props.stakedData;
  const isStaked = !!stakedData && !isConfirmedModal;

  return (
    <div>
      <div className="flex gap-5 items-center">
        <div>
          <Link to={props.goBackLink} className="w-5 h-5">
            <BackArrowIcon />
          </Link>
        </div>
        <Img
          src={application.jobAd.company.photoUrl}
          alt={application.jobAd.company.name}
          placeholder={jobPlaceholderImage}
          error={jobPlaceholderImage}
          className="rounded-md object-cover w-[70px] h-[70px]"
        />
        <div className="flex flex-col gap-2">
          <span className="font-sora font-bold text-3xl">
            {application.jobAd.title}
          </span>
          <span className="text-xs text-secondary">
            {application.jobAd.location}
          </span>
        </div>
        <div className="ml-auto">
          {isStaked ? (
            <UnstakeModal application={application} amount={stakedData.amount}>
              {(open) => (
                <button
                  onClick={open}
                  className="btn-transparent py-3 px-10 font-bold"
                >
                  UNSTAKE
                </button>
              )}
            </UnstakeModal>
          ) : (
            <StakeModal application={application}>
              {(open) => (
                <button
                  onClick={open}
                  className="btn-degraded py-3 px-10 font-bold"
                >
                  STAKE
                </button>
              )}
            </StakeModal>
          )}
        </div>
      </div>

      <div className="mt-10 bg-card rounded-md p-5 flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-sora font-normal text-sm text-[#928CA6]">
            Company
          </span>
          <span className="font-medium text-sm">
            {application.jobAd.company.name}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sora font-normal text-sm text-[#928CA6]">
            Location
          </span>
          <span className="font-medium text-sm">
            {application.jobAd.location}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sora font-normal text-sm text-[#928CA6]">
            Annual Salary
          </span>
          <span className="font-medium text-sm">
            {application.jobAd.currency}
            {application.jobAd.minSalary}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sora font-normal text-sm text-[#928CA6]">
            Status
          </span>
          <span className="font-medium text-sm capitalize">
            {application.jobAd.status}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sora font-normal text-sm text-[#928CA6]">
            Posted
          </span>
          <span className="font-medium text-sm capitalize">
            {new Date(application.jobAd.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <JobTags jobAd={application.jobAd} />

        {application.jobAd.jobSkills && application.jobAd.jobSkills.length > 0 && (
          <div className="flex gap-2 items-center">
            <span className="text-sm font-normal font-sora text-[#D0C9D6]">
              Skills:
            </span>
            <div className="flex flex-nowrap overflow-scroll uppercase gap-[6px] text-[12px] leading-[16px] font-roboto">
              {application.jobAd.jobSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex whitespace-nowrap items-center justify-center h-[18px] px-2 text-center bg-[#5362E9] rounded-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-11 flex flex-col gap-6">
        <div className="bg-card p-4 rounded-2xl flex flex-col gap-3">
          <h5 className="font-sora text-[#D0C9D6] text-sm">Description:</h5>
          <p className="text-xs">{application.jobAd.description}</p>
        </div>

        <div className="bg-card p-4 rounded-2xl flex flex-col gap-3">
          <h5 className="font-sora text-[#D0C9D6] text-sm">
            Responsibilities:
          </h5>
          <p className="text-xs">{application.jobAd.responsibilities}</p>
        </div>

        <div className="bg-card p-4 rounded-2xl flex flex-col gap-3">
          <h5 className="font-sora text-[#D0C9D6] text-sm">Requirements:</h5>
          <p className="text-xs">{application.jobAd.requirements}</p>
        </div>

        <div className="bg-card p-4 rounded-2xl flex flex-col gap-3">
          <h5 className="font-sora text-[#D0C9D6] text-sm">Preferred:</h5>
          <p className="text-xs">{application.jobAd.preferred}</p>
        </div>

        <div className="bg-card p-4 rounded-2xl flex flex-col gap-3">
          <h5 className="font-sora text-[#D0C9D6] text-sm">Benefits:</h5>
          <p className="text-xs">{application.jobAd.benefits}</p>
        </div>

        <div className="bg-card p-4 rounded-2xl flex flex-col gap-3">
          <h5 className="font-sora text-[#D0C9D6] text-sm">
            About {application.jobAd.company.name}:
          </h5>
          <p className="text-xs">{application.jobAd.company.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

type JobTagsProps = {
  jobAd: Partial<JobAdForStaker>;
};

const JobTags = ({ jobAd }: JobTagsProps): JSX.Element => {
  const { experience, field, format, isRemote } = jobAd;

  return (
    <div className="flex gap-2">
      <span className="text-sm font-normal font-sora text-[#D0C9D6]">
        Tags:
      </span>
      <div className="overflow-scroll flex uppercase gap-[6px] text-[12px] leading-[16px] font-roboto">
        {[experience, field, format, isRemote ? "Remote" : ""]
          .filter(Boolean)
          .map((tag) => {
            if (tag) {
              return (
                <div
                  key={tag}
                  className="flex whitespace-nowrap items-center justify-center h-[18px] px-2 text-center bg-[#5362E9] rounded-sm"
                >
                  {tag.replaceAll("_", " ")}
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};
