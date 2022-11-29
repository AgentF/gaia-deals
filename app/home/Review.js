import { formatDistance, subDays } from 'date-fns'
import { BasicBadge } from "../layout/CustomBadges";
import { getBase58Address } from "../tronsvc";

const Review = ({ data, from }) => {
    if (data === null) {
        return <div></div>
    }

    const date = formatDistance(new Date(parseInt(data.timestamp)), new Date(), { addSuffix: true })

    return (
        <div className="flex items-start w-full shadow-md border border-white bg-white rounded p-5 my-4">
            <div className="w-24 mr-4">
                <img src="/users/users-1.svg" alt="avatar" className="rounded-full bg-green-300 w-20 h-20" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <span><b>From </b> {getBase58Address(from)}</span>
                    <BasicBadge text={parseInt(data.score) + " pt"} color="green" size="md"/>
                </div>
                <div className="text-gray-500 text-sm my-2">{date}</div>
                <div>
                    { data.comment }
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore */}
                </div>
            </div>
        </div>
    )
}

export default Review;