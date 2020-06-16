export interface UploadMediaInterface {
    onDroppedEvent(event: any): void;

    onChangeEvent(event: any): void;

    getMedia(): Array<File>;
    clearMedia(): void;
}


export class UploadMediaClass implements UploadMediaInterface {
    private media: Array<File> = [];

     onChangeEvent(event: any): void {
        this.setMedia(event.target.files);
    }

     onDroppedEvent(event: any): void {
        event.stopPropagation();
        event.preventDefault();
        this.setMedia(event.dataTransfer.files)
    }

    private setMedia(files: Array<File>): void {
        files.forEach((file: File) => {
            this.media.push(file)
        })
    }

    public getMedia(): Array<File> {
        return this.media;
    }

    public clearMedia(): void {
         this.media = [];
    }


}
