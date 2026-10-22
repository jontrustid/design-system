import FileUpload from '../../blocks/forms/FileUpload';

export default function FileUploadDemo() {
  return (
    <div className="w-full max-w-lg">
      <FileUpload
        label="Drop a CSV file here or click to browse"
        hint="Bulk application import - .csv only"
        accept=".csv"
        onFiles={(files) => console.log('files', files.map((f) => f.name))}
      />
    </div>
  );
}
