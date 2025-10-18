type SchemaRecord = Record<string, unknown>;
export const dentistSchema = (org:{name:string;url:string;logo?:string;telephone?:string;address?:SchemaRecord}): SchemaRecord => ({ "@context":"https://schema.org","@type":"Dentist", ...org });
export const faqPageSchema = (faqs:{question:string;answer:string}[]): SchemaRecord => ({ "@context":"https://schema.org","@type":"FAQPage","mainEntity": faqs.map(f=>({"@type":"Question","name":f.question,"acceptedAnswer":{"@type":"Answer","text":f.answer}})) });
export const medicalProcedureSchema = (p:{name:string;description:string;url:string}): SchemaRecord => ({ "@context":"https://schema.org","@type":"MedicalProcedure", ...p });
export const howToSchema = (h:{name:string;steps:string[]}): SchemaRecord => ({ "@context":"https://schema.org","@type":"HowTo","name":h.name,"step": h.steps.map(s=>({"@type":"HowToStep","text":s})) });
