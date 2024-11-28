// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
	// The properties should include vin, color, make, model, year, weight, top speed, wheels, and towing capacity
	// The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[]), towingCapacity (number)
	vin: string;
	color: string;
	make: string;
	model: string;
	year: number;
	weight: number;
	topSpeed: number;
	wheels: Wheel[];
	towingCapacity: number;

	// Create a constructor that accepts the properties of the Truck class
	constructor(
		vin: string,
		color: string,
		make: string,
		model: string,
		year: number,
		weight: number,
		topSpeed: number,
		wheels: Wheel[],
		towingCapacity: number
	) {
		super();

		this.vin = vin;
		this.color = color;
		this.make = make;
		this.model = model;
		this.year = year;
		this.weight = weight;
		this.topSpeed = topSpeed;
		this.towingCapacity = towingCapacity;

		// The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
		if (wheels.length !== 4) {
			this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
		} else {
			this.wheels = wheels;
		}
	}

	// Implement the tow method from the AbleToTow interface
	tow(vehicle: Truck | Motorbike | Car): void {
		// Get the make an model of the vehicle to be towed if it exists
		const make = vehicle.make;
		const model = vehicle.model;
		let message: string = `The ${make} ${model} is `;
		// Check if the vehicle's weight is less than or equal to the truck's towing capacity
		if (vehicle.weight <= this.towingCapacity) {
			// If it is, log that the vehicle is being towed
			message += `being towed.`;
			console.log(message);
		} else {
			// If it is not, log that the vehicle is too heavy to be towed
			message += `too heavy to be towed.`;
			console.log(message);
		}
	}

	// Override the printDetails method from the Vehicle class
	override printDetails(): void {
		super.printDetails();
		// The method should log the details of the Truck
		// The details should include the VIN, make, model, year, weight, top speed, color, towing capacity, and wheels
		console.log(`VIN: ${this.vin}`);
		console.log(`Color: ${this.color}`);
		console.log(`Make: ${this.make}`);
		console.log(`Model: ${this.model}`);
		console.log(`Year: ${this.year}`);
		console.log(`Weight: ${this.weight} lbs`);
		console.log(`Top Speed: ${this.topSpeed} mph`);
		console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
		console.log(`Wheel 1 is ${this.wheels[0].getDiameter} inches with a ${this.wheels[0].getTireBrand} tire`);
		console.log(`Wheel 2 is ${this.wheels[1].getDiameter} inches with a ${this.wheels[1].getTireBrand} tire`);
		console.log(`Wheel 3 is ${this.wheels[2].getDiameter} inches with a ${this.wheels[2].getTireBrand} tire`);
		console.log(`Wheel 4 is ${this.wheels[3].getDiameter} inches with a ${this.wheels[3].getTireBrand} tire`);
	}
}

// Export the Truck class as the default export
export default Truck;