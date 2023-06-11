import { Request, Response } from "express"
import { db } from "../config/firebase.config"
import { validateFirebaseToken } from "../utils/validateToken"
import { spawn } from "child_process"

interface Company {
	id: string
	name: string
	logo: string
	yearOfFoundation: string
	marketAreaOperation: string
	mainTechnologies: string[]
	createdAt: Date
	updatedAt: Date
	positivePoints: string[]
	negativePoints: string[]
}

// Create a function to create a company
async function CreateCompany(company: Company): Promise<void> {
	const { id, ...data } = company
	const now = new Date()

	// Check if the 'companies' collection exists, create it if not
	const collectionRef = db.collection("companies")
	const collectionSnapshot = await collectionRef.limit(1).get()
	if (collectionSnapshot.empty) {
		await collectionRef.doc().set({})
	}
	console.log({ ...data })
	// Create the company document in the 'companies' collection
	const companyRef = collectionRef.doc(id)
	await companyRef.set({
		...data,
		createdAt: now,
		updatedAt: now,
	})
}

async function GenerateCompaniesRecommendation(
	request: Request,
	response: Response
) {
	try {
		const token = request.headers.authorization

		if (!token) {
			throw new Error("Auth Token not provided")
		}

		const isValidToken = await validateFirebaseToken(token)
		if (!isValidToken) throw new Error("Invalid authorization token")

		const userMarketArea = request.body.marketAreaOperation

		if (!userMarketArea) {
			throw new Error("Market Area not provided")
		}
		const userTechnologies = request.body.mainTechnologies

		if (!userTechnologies) {
			throw new Error("User Technologies not provided")
		}

		const arg1 = userMarketArea
		const arg2 = userTechnologies.join(",")

		const resultado = await generateRecommendedCompanies(arg1, arg2)

		return response.status(200).json({
			message: "Successful",
			companies: resultado,
		})
	} catch (error: any) {
		// console.error(error);
		return response.status(401).json({
			message: "Unauthorized",
			errorMessage: error.message,
		})
	}
}

async function generateRecommendedCompanies(
	arg1: string,
	arg2: string
): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		const scriptPath = "src\\utils\\script.py"

		const processo = spawn("python", [scriptPath, arg1, arg2])

		let output = ""
		processo.stdout.on("data", (data) => {
			output += data.toString()
		})

		processo.stderr.on("data", (data) => {
			reject(data.toString())
		})

		processo.on("error", (error) => {
			console.log(`Erro ao executar o script Python: ${error.message}`)
		})

		processo.on("close", (code) => {
			if (code === 0) {
				output = output.replace(/'/g, '"')
				resolve(JSON.parse(output))
			} else {
				reject(`O processo Python foi encerrado com o código de saída ${code}`)
			}
		})
	})
}

async function GenerateJobsRecomendation(request: Request, response: Response) {
	try {
		// const token = request.headers.authorization

		// if (!token) {
		// 	throw new Error("Auth Token not provided")
		// }

		// const isValidToken = await validateFirebaseToken(token)
		// if (!isValidToken) throw new Error("Invalid authorization token")

		const arg1 = "microsoft"

		const resultado = await generateRecommendedJobs(arg1)

		return response.status(200).json({
			message: "Successful",
			companies: resultado,
		})
	} catch (error: any) {
		// console.error(error);
		return response.status(401).json({
			message: "Unauthorized",
			errorMessage: error.message,
		})
	}
}

async function generateRecommendedJobs(arg1: string): Promise<string[]> {
	return new Promise<string[]>((resolve, reject) => {
		const scriptPath = "src\\utils\\scraping.py"

		const processo = spawn("python", [scriptPath, arg1])

		let output = ""
		processo.stdout.on("data", (data) => {
			output += data.toString()
		})

		processo.stderr.on("data", (data) => {
			reject(data.toString())
		})

		processo.on("error", (error) => {
			console.log(`Erro ao executar o script Python: ${error.message}`)
		})

		processo.on("close", (code) => {
			if (code === 0) {
				resolve(JSON.parse(output))
			} else {
				reject(`O processo Python foi encerrado com o código de saída ${code}`)
			}
		})
	})
}

// Export the model and any relevant functions
export {
	Company,
	CreateCompany,
	GenerateCompaniesRecommendation,
	GenerateJobsRecomendation,
}
