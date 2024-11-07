<template>
    <Teleport to="#footer">
        <div class="footer-container">
            <div class="footer__text-container">
                <h3 class="footer-text">all rights reserved</h3>
            </div>
        </div>
    </Teleport>
</template>

<script setup>

</script>

<style lang="scss">

    .footer {
        background: #FAFAFA;
        box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);
        height: 100%;
        width: 100%;

        &-container {
            display: grid;
            align-items: center;
            align-content: center;
            justify-content: center;
            height: 100%;
            width: 100%;

        }

        &__text-container {
            margin: 5px;
            display: flex;
            align-items: flex-end;
            width: 116px;
            height: 16px;
            flex: none;
            order: 0;
            flex-grow: 0;
        }

        &-text {
            font-size: 0.813rem;
            line-height: 1rem;
        }
    }





    



    
</style>