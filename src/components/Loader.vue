<template>
    <div class="loader-wrapper">
        <div class="loader"></div>
    </div>
</template>


<style scoped>
     .loader-wrapper {
         height: 100%;
         width: 100%;
         background-color: rgba(255,255,255,0.6);
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         z-index: 5;
         position: fixed;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
     }
     .loader{
        border: 1rem solid #f3f3f3;
        border-top: 1rem solid#4a148c;
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>