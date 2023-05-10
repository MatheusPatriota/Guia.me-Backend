import { db } from "../config/firebase.config";

interface Company {
  id: string;
  name: string;
  logo: string;
  yearOfFoundation: string;
  marketAreaOperation: string;
  mainTechnologies: string[];
  createdAt: Date;
  updatedAt: Date;
  positivePoints: string[];
  negativePoints: string[];
}


// Create a function to create a company
async function CreateCompany(company: Company): Promise<void> {
  const { id, ...data } = company;
  const now = new Date();

  // Check if the 'companies' collection exists, create it if not
  const collectionRef = db.collection('companies');
  const collectionSnapshot = await collectionRef.limit(1).get();
  if (collectionSnapshot.empty) {
    await collectionRef.doc().set({});
  }
  console.log({...data})
  // Create the company document in the 'companies' collection
  const companyRef = collectionRef.doc(id);
  await companyRef.set({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
}


// Export the model and any relevant functions
export { Company, CreateCompany };