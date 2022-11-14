import { BasicBadge } from "./Badges";
import { splitHexAddress } from "../utils";

const Review = () => {
    return (
        <div className="flex items-start w-full shadow-md border border-white bg-white rounded p-5 my-4">
            <div className="w-24 mr-4">
                <img src="/users/users-1.svg" alt="avatar" className="rounded-full bg-green-300 w-20 h-20" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <span><b>From Seller</b> {splitHexAddress("TQDUiXESXKpn17N9ajjRW3vnvbzDvvWq5S")}</span>
                    <BasicBadge text="95%" color="green" size="md"/>
                </div>
                <div className="text-gray-500 text-sm my-2">Some days ago</div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                </div>
            </div>
        </div>
    )
}

export default Review;