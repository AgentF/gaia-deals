import React, { useState, useRef } from "react";
import { TagsInput } from "react-tag-input-component";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const SellForm = () => {
    const refTitle = useRef();
    const refDescription = useRef();
    const refImage = useRef();
    const refCategory = useRef();
    const refPrice = useRef();
    const refCountry = useRef();
    const reflifeTime = useRef();
    const refMaterials = useRef();

    const [image, setFile] = useState(null);
    const [selected, setSelected] = useState(["Wood"]);

    const handleImageChange = (image) => {
        const reader = new FileReader();
        reader.onload = function () {
            setFile(reader.result);
        };
        reader.readAsDataURL(image);
    };

    const handleSubmit = (e) => {
        // console.log('Title', refTitle.current.value);
        // console.log('Description', refDescription.current.value);
        // console.log('Image', refImage.current.value);
        // console.log('Category', refCategory.current.value);
        // console.log('Price', refPrice.current.value);
        // console.log('Country', refCountry.current.value);
        // console.log('Life Time', reflifeTime.current.value);
        // console.log('Materials', refMaterials.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                    <label
                        className="text-gray-900 font-bold text-xl"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            mt-2
                            mb-10
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text"
                        id="title"
                        name="title"
                        ref={refTitle}
                        placeholder="Sofa"
                    />
                    <label
                        className="text-gray-900 font-bold text-xl"
                        htmlFor="desc"
                    >
                        Description
                    </label>
                    <textarea
                        className="form-control block
                            w-full
                            h-36
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            mt-2
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text"
                        id="desc"
                        name="desc"
                        ref={refDescription}
                        placeholder="Good old comfy sofa"
                    />
                </div>
                <div className="form-group mb-6">
                    <label
                        className="text-gray-900 font-bold text-xl"
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
                    <label
                        className="text-gray-900 font-bold text-xl"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            mt-2
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="category"
                        name="category"
                        ref={refCategory}
                    >
                        <option value="furniture">Furniture</option>
                        <option value="clothes">Clothes</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group mb-6">
                    <label
                        className="text-gray-900 font-bold text-xl"
                        htmlFor="price"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            mt-2
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="price"
                        name="price"
                        ref={refPrice}
                        placeholder="100$"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                    <label
                        className="text-gray-900 font-bold text-xl"
                        htmlFor="country"
                    >
                        Country
                    </label>
                    <select
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            mt-2
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="country"
                        name="country"
                        ref={refCountry}
                    >
                        <option value="us">US</option>
                        <option value="canada">Canada</option>
                        <option value="mexico">Mexico</option>
                    </select>
                </div>
                <div className="form-group mb-6">
                    <label
                        className="text-gray-900 font-bold text-xl"
                        htmlFor="lifeTime"
                    >
                        Life Time
                    </label>
                    <input
                        type="text"
                        className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            mt-2
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="lifeTime"
                        name="lifeTime"
                        ref={reflifeTime}
                        placeholder="6 months"
                    />
                </div>
            </div>
            <div className="form-group mb-6">
                <label
                    className="text-gray-900 font-bold text-xl"
                    htmlFor="materials"
                >
                    Materials
                </label>
                <TagsInput
                    value={selected}
                    onChange={setSelected}
                    id="materials"
                    name="materials"
                    placeHolder="Enter materials"
                />
            </div>
            <button
                type="submit"
                style={{ backgroundColor: "#53D676" }}
                className="
                        px-6
                        py-2.5
                        text-white
                        font-medium
                        justify-self-center
                        text-lg
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
            >
                Publish
            </button>
        </form>
    );
};

export default SellForm;
