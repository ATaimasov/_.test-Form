<template>
    <form class="form" @submit.prevent="saveInfo">
        <div class="form__container">
            <h2 class="form__title">Персональные данные</h2>
            <input type="text" placeholder="Имя" class="form__input">
            <input type="text" placeholder="Возраст" class="form__input">
        </div>
        <div class="form__container">
            <div class="form__title">
                <h2 class="form__title-header">Дети (макс. 5)</h2>
                <button class="form__title-button btn btn-add">Добавить ребенка</button>
            </div>
            <div class="form__children-list">
                <input type="text" placeholder="Имя" class="form__input">
                <input type="text" placeholder="Возраст" class="form__input">    
                <ButtonRemove/>
            </div>
            
        </div>
        <button type="submit" class="btn btn-save">Сохранить</button>
    </form>
</template>

<script setup>
import ButtonRemove from '@/components/UI/ButtonRemove.vue'
</script>

<style lang="scss" scoped>

    .form {
        width: 49.1%; //616px;
        margin-top: 30px; 
        display: flex;
        flex-direction: column;
        gap: 44px;

        &__container {
            width: 616px;
            height: 166px;
            display: flex;
            flex-direction: column;
            row-gap: 10px;
        }

        &__title {
            padding-bottom: 10px;
            font-weight: 500;
            line-height: $line-height-h3;
            font-size: $font-size-h2;
            display: flex;
            justify-content: space-between;
        }

        &__children-list {
            display: flex;
            gap: 18px;
        }


        &__input {
            height: 56px;
            border: 1px solid $color-GrayL;
            border-radius: $button-border-radius;
            padding-left: 10px;
        }

        
    }
</style>