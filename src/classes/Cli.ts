// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
	vehicles: (Car | Truck | Motorbike)[];
	selectedVehicleVin: string | undefined;
	exit: boolean = false;

	constructor(vehicles: (Car | Truck | Motorbike)[]) {
		this.vehicles = vehicles;
	}

	// static method to generate a vin
	static generateVin(): string {
		// return a random string
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		);
	}

	// method to choose a vehicle from existing vehicles
	chooseVehicle(): void {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'selectedVehicleVin',
					message: 'Select a vehicle to perform an action on',
					choices: this.vehicles.map((vehicle) => {
						return {
							name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
							value: vehicle.vin,
						};
					}),
				},
			])
			.then((answers) => {
				// set the selectedVehicleVin to the vin of the selected vehicle
				this.selectedVehicleVin = answers.selectedVehicleVin;
				// perform actions on the selected vehicle
				this.performActions();
			});
	}

	// method to create a vehicle
	createVehicle(): void {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'vehicleType',
					message: 'Select a vehicle type',
					choices: ['Car', 'Truck', 'Motorbike'],
				},
			])
			.then((answers) => {
				if (answers.vehicleType === 'Car') {
					this.createCar();
				} else if (answers.vehicleType === 'Truck') {
					this.createTruck();
				} else if (answers.vehicleType === 'Motorbike') {
					this.createMotorbike();
				}
			});
	}

	// method to create a car
	createCar(): void {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'color',
					message: 'Enter color',
				},
				{
					type: 'input',
					name: 'make',
					message: 'Enter make',
				},
				{
					type: 'input',
					name: 'model',
					message: 'Enter model',
				},
				{
					type: 'input',
					name: 'year',
					message: 'Enter year',
				},
				{
					type: 'input',
					name: 'weight',
					message: 'Enter weight in lbs',
				},
				{
					type: 'input',
					name: 'topSpeed',
					message: 'Enter top speed',
				},
				{
					type: 'input',
					name: 'wheelDiameter',
					message: 'Enter wheel diameter in inches on the car (must enter diameter and brand to not use default wheel)',
				},
				{
					type: 'input',
					name: 'wheelBrand',
					message: 'Enter wheel brand on the car (must enter diameter and brand to not use default wheel)',
				},
			])
			.then((answers) => {
				// we create a default wheel object to use and assign it values if given
				let wheel = new Wheel();
				if (answers.wheelDiameter.trim() != '' && answers.wheelBrand.trim() != '') {
					wheel = new Wheel(answers.wheelDiameter, answers.wheelBrand);
				}
				const car = new Car(
					// The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating any vehicle
					Cli.generateVin(),
					answers.color,
					answers.make,
					answers.model,
					parseInt(answers.year),
					parseInt(answers.weight),
					parseInt(answers.topSpeed),
					[wheel, wheel, wheel, wheel]
				);
				// push the car to the vehicles array
				this.vehicles.push(car);
				// set the selectedVehicleVin to the vin of the car
				this.selectedVehicleVin = car.vin;
				// perform actions on the car
				this.performActions();
			});
	}

	// method to create a truck
	createTruck(): void {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'color',
					message: 'Enter color',
				},
				{
					type: 'input',
					name: 'make',
					message: 'Enter make',
				},
				{
					type: 'input',
					name: 'model',
					message: 'Enter model',
				},
				{
					type: 'input',
					name: 'year',
					message: 'Enter year',
				},
				{
					type: 'input',
					name: 'weight',
					message: 'Enter weight in lbs',
				},
				{
					type: 'input',
					name: 'topSpeed',
					message: 'Enter top speed',
				},
				{
					type: 'input',
					name: 'wheelDiameter',
					message: 'Enter wheel diameter in inches on the truck (must enter diameter and brand to not use default wheel)',
				},
				{
					type: 'input',
					name: 'wheelBrand',
					message: 'Enter wheel brand on the truck (must enter diameter and brand to not use default wheel)',
				},
				{
					type: 'input',
					name: 'towingCapacity',
					message: 'Enter towing capacity in lbs',
				},
			])
			.then((answers) => {
				// we create a default wheel object to use and assign it values if given
				let wheel = new Wheel();
				if (answers.wheelDiameter.trim() != '' && answers.wheelBrand.trim() != '') {
					wheel = new Wheel(answers.wheelDiameter, answers.wheelBrand);
				}
				const truck = new Truck(
					Cli.generateVin(),
					answers.color,
					answers.make,
					answers.model,
					parseInt(answers.year),
					parseInt(answers.weight),
					parseInt(answers.topSpeed),
					[wheel, wheel, wheel, wheel],
					answers.towingCapacity
				);
				// push the truck to the vehicles array,  set the selectedVehicleVin to the vin of the truck, perform actions on the truck
				this.vehicles.push(truck);
				this.selectedVehicleVin = truck.vin;
				this.performActions();
			});
	}

	// method to create a motorbike
	createMotorbike(): void {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'color',
					message: 'Enter color',
				},
				{
					type: 'input',
					name: 'make',
					message: 'Enter make',
				},
				{
					type: 'input',
					name: 'model',
					message: 'Enter model',
				},
				{
					type: 'input',
					name: 'year',
					message: 'Enter year',
				},
				{
					type: 'input',
					name: 'weight',
					message: 'Enter weight',
				},
				{
					type: 'input',
					name: 'topSpeed',
					message: 'Enter top speed',
				},
				{
					type: 'input',
					name: 'frontWheelDiameter',
					message: 'Enter front wheel diameter in inches (must enter diameter and brand to not use default wheel)',
				},
				{
					type: 'input',
					name: 'frontWheelBrand',
					message: 'Enter front wheel brand (must enter diameter and brand to not use default wheel)',
				},
				{
					type: 'input',
					name: 'rearWheelDiameter',
					message: 'Enter rear wheel diameter in inches (must enter diameter and brand to not use default wheel)',
				},
				{
					type: 'input',
					name: 'rearWheelBrand',
					message: 'Enter rear wheel brand (must enter diameter and brand to not use default wheel)',
				},
			])
			.then((answers) => {
				// we create a 2 default wheel objects to use and assign them values if given
				// this has two statements for the wheels since front and back may be different
				let wheel1 = new Wheel();
				let wheel2 = new Wheel();
				if (answers.frontWheelDiameter.trim() != '' && answers.frontWheelBrand.trim() != '') {
					wheel1 = new Wheel(answers.frontWheelDiameter, answers.frontWheelBrand);
				}
				if (answers.rearWheelDiameter.trim() != '' && answers.rearWheelBrand.trim() != '') {
					wheel2 = new Wheel(answers.frontWheelDiameter, answers.frontWheelBrand);
				}
				const motorbike = new Motorbike(
					Cli.generateVin(),
					answers.color,
					answers.make,
					answers.model,
					parseInt(answers.year),
					parseInt(answers.weight),
					parseInt(answers.topSpeed),
					[wheel1, wheel2]
				);
				// push the motorbike to the vehicles array, set the selectedVehicleVin to the vin of the motorbike, perform actions on the motorbike
				this.vehicles.push(motorbike);
				this.selectedVehicleVin = motorbike.vin;
				this.performActions();
			});
	}

	// method to find a vehicle to tow
	findVehicleToTow(truck: Truck): void {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'vehicleToTow',
					message: 'Select a vehicle to tow',
					choices: this.vehicles.map((vehicle) => {
						return {
							name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
							value: vehicle,
						};
					}),
				},
			])
			.then((answers) => {
				// check if the selected vehicle is the SAME truck, remember answer is an object, now containing vehicleToTow object that has all properties of the vehicle passed in
				console.log(answers);
				if (truck.vin === answers.vehicleToTow.vin) {
					// if it is, logs that the truck cannot tow itself then return to perform actions on the truck to allow a new choice
					console.log(`The ${truck.make} ${truck.model} can't tow itself`);
					this.performActions();
				} else {
					// if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action
					truck.tow(answers.vehicleToTow);
					this.performActions();
				}
			});
	}

	// method to perform actions on a vehicle
	performActions(): void {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'action',
					message: 'Select an action',
					choices: [
						'Print details',
						'Start vehicle',
						'Accelerate 5 MPH',
						'Decelerate 5 MPH',
						'Stop vehicle',
						'Turn right',
						'Turn left',
						'Reverse',
						'Tow', // use on truck only, in function, check if vehicle is a truck before executing, tow weight handled by AbleToTow interface and Truck class
						'Wheelie', // use on motorbike only, in function, check if vehicle is a bike before executing
						'Select or create another vehicle',
						'Exit',
					],
				},
			])
			.then((answers) => {
				// perform the selected action
				if (answers.action === 'Print details') {
					// find the selected vehicle and print its details
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].printDetails();
						}
					}
				} else if (answers.action === 'Start vehicle') {
					// find the selected vehicle and start it
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].start();
						}
					}
				} else if (answers.action === 'Accelerate 5 MPH') {
					// find the selected vehicle and accelerate it by 5 MPH
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].accelerate(5);
						}
					}
				} else if (answers.action === 'Decelerate 5 MPH') {
					// find the selected vehicle and decelerate it by 5 MPH
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].decelerate(5);
						}
					}
				} else if (answers.action === 'Stop vehicle') {
					// find the selected vehicle and stop it
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].stop();
						}
					}
				} else if (answers.action === 'Turn right') {
					// find the selected vehicle and turn it right
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].turn('right');
						}
					}
				} else if (answers.action === 'Turn left') {
					// find the selected vehicle and turn it left
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].turn('left');
						}
					}
				} else if (answers.action === 'Reverse') {
					// find the selected vehicle and reverse it
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin) {
							this.vehicles[i].reverse();
						}
					}
				} else if (answers.action === 'Tow') {
					// find vehicle first, compare vehicle type, it must be truck, then we execute findVehicleToTow
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i].constructor === Truck) { // compares the vin AND if the value is a truck, since only trucks can tow
							// we know the type already, but array contains multiple types, assign any type to allow to pass what typescript still may think is a Car or Motorbike
							const towTruck: any = this.vehicles[i];
							this.findVehicleToTow(towTruck);
							return; // we return to prevent the final performActions from immediately executing since findVehicleToTow is asynchronous
						} else if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i].constructor != Truck) {
							console.log(`${this.vehicles[i].make} ${this.vehicles[i].model} isn't a truck and can't tow!`);
						}
					}
				} else if (answers.action === 'Wheelie') {
					// find the selected vehicle check is a motorbike and if not will let you know selected vehicle can't wheelie
					for (let i = 0; i < this.vehicles.length; i++) {
						if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i].constructor === Motorbike) { // compares the vin AND if the value is a motorbike, since only motorbikes can wheelie
							// we know the type already, but array contains multiple types, assign any type to allow to pass what typescript still may think is a Car or Motorbike
							const motorbike: any = this.vehicles[i];
							motorbike.wheelie();
						} else if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i].constructor != Motorbike) {
							console.log(`${this.vehicles[i].make} ${this.vehicles[i].model} isn't a motorbike and can't wheelie!`);
						}
					}
				} else if (answers.action === 'Select or create another vehicle') {
					// start the cli to return to the initial prompt if the user wants to select or create another vehicle
					this.startCli();
					return;
				} else {
					// exit the cli if the user selects exit
					this.exit = true;
				}
				if (!this.exit) {
					// if the user does not want to exit, perform actions on the selected vehicle
					this.performActions();
				}
			});
	}

	// method to start the cli
	startCli(): void {
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'CreateOrSelect',
					message:
						'Would you like to create a new vehicle or perform an action on an existing vehicle?',
					choices: ['Create a new vehicle', 'Select an existing vehicle'],
				},
			])
			.then((answers) => {
				// check if the user wants to create a new vehicle or select an existing vehicle
				if (answers.CreateOrSelect === 'Create a new vehicle') {
					this.createVehicle();
				} else {
					this.chooseVehicle();
				}
			});
	}
}

// export the Cli class
export default Cli;
