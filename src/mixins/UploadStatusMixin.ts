export interface UploadingInterface {
    isUploading: boolean;
    uploadingIndex: number;
    uploadingTotal: number;
}

export const UploadStatusMixin = {
    data() {
        return {
            uploading: {
                isUploading: false, uploadingIndex: 0, uploadingTotal: 1,
            } as UploadingInterface
        }
    }, computed: {
        ProgressbarProgression(): any {
            return {
                top: 100 - (Math.ceil((this.uploading.uploadingIndex / this.uploading.uploadingTotal) * 100)) + "%",
            }
        }
    }, methods : {
        setUploadingIndex(number: number) {
            this.uploading.uploadingIndex = number
        }, setUploadingTotal(number: number) {
            this.uploading.uploadingTotal = number;
        }, setUploadingStatus(status: boolean) {
            this.uploading.isUploading = status
        }, onImageDrop(event: any) {
            event.stopPropagation();
            event.preventDefault();
            this.uploadImages(event.dataTransfer.files);
        }, onImageChange(event: any) {
            this.uploadImages(event.target.files);
        }, async uploadImages(fileList: any) {
            this.setUploadingTotal(fileList.length)
            this.setUploadingStatus(true);

            for (const image of fileList) {
                this.uploading.uploadingIndex++
                await this.uploadImage(image);
            }

            this.setUploadingIndex(0);
            this.setUploadingTotal(1)
            this.setUploadingStatus(false)
        },
    }
}