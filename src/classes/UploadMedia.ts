export interface UploadMediaInterface {
    onDroppedEvent(event: any): void;

    onChangeEvent(event: any): void;

    getMedia(): Array<File>;
}


export class UploadMedia implements UploadMediaInterface {
    private _media: Array<File> = [];

    public onChangeEvent(event: any): void {
        this.setMedia(event.target.files);
    }

    public onDroppedEvent(event: any): void {
        event.stopPropagation();
        event.preventDefault();
        this.setMedia(event.dataTransfer.files)
    }

    private setMedia(files: Array<File>): void {
        files.forEach((file: File) => {
            this._media.push(file)
        })
    }

    public getMedia(): Array<File> {
        return this._media;
    }

}