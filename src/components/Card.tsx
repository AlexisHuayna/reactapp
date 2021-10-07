import data from "../data";

interface CardProps {
    img?: string;
    text?: string;
}



const birthdays = data.map((dude) => {
    return (
        <li>

        </li>
    );
});

const Card = () => {

    const partys = "24 birthdays today"

    return (
        <div className="z-20 w-3/12 bg-white bg-blend-lighten rounded mx-auto my-auto">
            <div className="py-2">
                <h2 className="pl-5">{partys}</h2>
            </div>
            <div>
                <ul>
                    {birthdays}
                </ul>
            </div>
            <div className="text-center">
                <button className="px-2 py-4 bg-pink-400 rounded mx-2 my-3 w-11/12 text-white bg-gradient-to-r from-purple-300 to-pink-500">View all</button>
            </div>
        </div>
    );
}

export default Card;