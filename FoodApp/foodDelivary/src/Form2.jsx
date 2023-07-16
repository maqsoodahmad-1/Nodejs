import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
// import { postData } from "./postData";

function FormData2() {
    const [showForm, setShowForm] = createSignal(false);
    const toggleForm = () => setShowForm(!(showForm()));
    const [food, createFood] = createStore([{
        name: "",
        type: "",
        category: "",
        available: "",
        location: "",
        duration: "",
        rating: "",
        description: "",
        shop: ""

    }]);
    function display() {
        console.log(food.name, food.type);
        postData();
    }

    function postData() {
        // console.log(food.name, dishType());
        fetch("/user/delivery", {
            method: "POST",
            body: JSON.stringify({
                name: food.name,
                type: food.type,
                category: food.category,
                available: food.available,
                location: food.location,
                duration: food.duration,
                rating: food.rating,
                description: food.description,
                shop: food.shop

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        toggleForm();
    }

    return (
        <>
            <Show when={showForm()} fallback={
                <button class="bg-blue-500  hover:bg-white mx-48 my-20 text-black hover:border-2 rounded-lg mt-2  hover:border-black font-bold py-2 px-4  focus:outline-none focus:shadow-outline " type="button"
                    onClick={toggleForm}>
                    Add Food
                </button>}>

                <form class="w-full max-w-lg mx-96 my-32 ">
                    <div class="-mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="food Name"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food Type
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Food Type"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food category
                            </label>
                            <select class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Choose">
                                 <option value="1" class="text-secondary-800">Veg</option>
                                 <option value="2">Non-Veg</option>
                            </select>
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food available
                            </label>
                            <select class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Choose">
                                 <option value="1">Yes</option>
                                 <option value="2">No</option>
                            </select>
                        </div><div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food location
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Food location"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-type">
                                Duration
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-dish-type" type="text" placeholder="Duration"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food Rating
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Rating"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food Description
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Food Description"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dish-name">
                                Food Shop
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-dish-name" type="text" placeholder="Shop"

                                onInput={(e) => createFood(e.target.value)}
                            />
                        </div>
                        <div class=" items-center justify-end">
                            <button class="bg-blue-500  hover:bg-white text-black hover:border-2 rounded-lg mt-2 mx-4 hover:border-black font-bold py-2 px-4  focus:outline-none focus:shadow-outline " type="button"
                                onClick={display}>
                                Submit
                            </button>
                        </div>
                    </div>

                </form>
            </Show>
        </>
    )
}
export default FormData2;