export const UploadStatusMixin = {
    data() {
        return {
            uploading: {
                is_uploading   : false,
                uploading_index: 0,
                uploading_total: 1,
            }
        }
    },
    computed: {
        ProgressbarProgression() {
            return {
                top:  100 - (Math.ceil((this.uploading.uploading_index / this.uploading.uploading_total) * 100))  + "%",
            }
        }
    },
    methods : {
        setUploadingIndex(number) {
            this.uploading.uploading_index = number
        },
        setUploadingTotal(number) {
            this.uploading.uploading_total = number;
        },
        setUploadingStatus(status) {
            this.uploading.is_uploading = status
        },
        onImageDrop(event) {
            event.stopPropagation();
            event.preventDefault();
            this.uploadImages(event.dataTransfer.files);
        },
        onImageChange(event) {
            this.uploadImages(event.target.files);
        },
        async uploadImages(fileList) {
            this.setUploadingTotal(fileList.length)
            this.setUploadingStatus(true);

            for (const image of fileList) {
                this.uploading.uploading_index++
                await this.uploadImage(image);
            }

            this.setUploadingIndex(0);
            this.setUploadingTotal(1)
            this.setUploadingStatus(false)
        },
    }
}