
const name1 = "Avtar";
const name2 = "Sngh";
export const name3= "Labana";
export const name4 = "Gottra";

const sayHello = (name)=>{
console.log(`Hello ${name}`);

}

export const rand = ()=>{
    return `${~~(Math.random()*100)}%`;
}

// module.exports = sayHello;
export default sayHello;
export {name1,name2};