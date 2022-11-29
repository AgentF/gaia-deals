import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDatacontext } from "../context";
import { TagsInput } from "react-tag-input-component";
import { FileUploader } from "react-drag-drop-files";
import { CustomInput, CustomSelect, CustomTextarea } from "../layout/CustomInputs";
import { getLocationCoords } from "../utils";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const SellForm = () => {
    const {
        data: { accountInfo },
        fn: { publishArticle },
    } = useDatacontext();

    const router = useRouter();
    const refTitle = useRef();
    const refDescription = useRef();
    const refCategory = useRef();
    const refPrice = useRef();
    const refCountry = useRef();
    const reflifeTime = useRef();
    const refzipCode = useRef();
    const refstate = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [materials, setMaterials] = useState(["Wood"]);

    const handleImageChange = (image) => {
        const reader = new FileReader();
        reader.onload = function () {
            setImage(reader.result);
        };
        reader.readAsDataURL(image);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    const submit = async () => {
        if (isLoading) return;

        const {lat=0, lng=0} = await getLocationCoords(`${refstate.current.value},${refCountry.current.value}`);

        const data = {
            id: uuidv4(),
            seller: accountInfo.address,
            title: refTitle.current.value,
            image: "https://via.placeholder.com/500?text=No+Image",
            category: refCategory.current.value,
            price: refPrice.current.value,
            description: refDescription.current.value,
            timestamp: Date.now(),
            details: {
                age: reflifeTime.current.value,
                materials: materials.join(","),
                country: refCountry.current.value,
                state: refstate.current.value,
                zipcode: refzipCode.current.value,
                weight: 1,
                coords: `${lat},${lng}`
            },
        };

        setIsLoading(true);
        /*const result = await publishArticle(data, image);
        setIsLoading(false);*/

        publishArticle(data, image)
            .then((response) => {
                console.log(response);
                if (response.success) alert("article published");
                setIsLoading(false);
                // go to home
                router.push(`/`);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                    <div className="mb-10">
                        <CustomInput
                            ref={refTitle}
                            type="text"
                            name="title"
                            label="Title"
                            placeholder="Green Sofa"
                        />
                    </div>
                    <CustomTextarea
                        ref={refDescription}
                        name="desc"
                        label="Description"
                        placeholder="Good old comfy sofa"
                    />
                </div>
                <div className="form-group mb-6">
                    <label
                        className="text-gray-700 font-semibold text-xl"
                        htmlFor="image"
                    >
                        Image
                    </label>
                    <FileUploader
                        value={image}
                        handleChange={handleImageChange}
                        name="image"
                        id="image"
                        multiple={false}
                        types={fileTypes}
                    >
                        <div className="cursor-pointer mt-2">
                            {image ? (
                                <img
                                    className="h-64 w-auto"
                                    src={image}
                                    alt="Image Preview"
                                />
                            ) : (
                                <div className="form-dnd h-64 w-full bg-white flex flex-col items-center justify-center p-4 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="#53D676"
                                        className="w-24 h-24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                        />
                                    </svg>
                                    <p className="text-lg font-bold text-gray-500">
                                        Upload or drop a file right here
                                    </p>
                                </div>
                            )}
                        </div>
                    </FileUploader>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                    <CustomSelect
                        ref={refCategory}
                        name="category"
                        label="Category"
                    >
                        <option value="furniture">Furniture</option>
                        <option value="clothes">Clothes</option>
                        <option value="other">Other</option>
                    </CustomSelect>
                </div>
                <div className="form-group mb-6">
                    <CustomInput
                        ref={refPrice}
                        type="text"
                        name="price"
                        label="Price"
                        placeholder="100"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                    <CustomInput
                        ref={reflifeTime}
                        type="text"
                        name="lifeTime"
                        label="Age (in Years)"
                        placeholder="2"
                    />
                </div>
                <div className="form-group mb-6">
                    <CustomInput
                        ref={refCountry}
                        type="text"
                        name="country"
                        label="Country"
                        placeholder="US"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                    <CustomInput
                        ref={refstate}
                        type="text"
                        name="state"
                        label="State/Province"
                        placeholder="California"
                    />
                </div>
                <div className="form-group mb-6">
                    <CustomInput
                        ref={refzipCode}
                        type="text"
                        name="zipCode"
                        label="Zip Code"
                        placeholder="90210"
                    />
                </div>
            </div>
            <div className="form-group mb-6">
                <label
                    className="text-gray-700 font-semibold text-xl"
                    htmlFor="materials"
                >
                    Materials
                </label>
                <TagsInput
                    value={materials}
                    onChange={setMaterials}
                    id="materials"
                    name="materials"
                    placeHolder="Enter materials"
                />
            </div>
            <button
                type="submit"
                className={`text-lg font-semibold rounded-md bg-green-500 hover:bg-green-600 py-2 px-4 text-sm text-white transition-all duration-150 ease-in-out`}
            >
                {isLoading ? "Wait a moment..." : "Publish"}
            </button>
        </form>
    );
};

export default SellForm;
