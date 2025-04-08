export interface FileData {
  id: string;
  name: string;
  downloadUrl: string;
  createdDateTime: string;
}

export interface DocumentsData {
  files: FileData[];
  birthCertExists: boolean;
  financialCertExists: boolean;
}
