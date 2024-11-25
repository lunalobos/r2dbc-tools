<script setup>
import Params from './components/Params.vue';
import EntityCode from './components/EntityCode.vue';
import EntityHeader from './components/EntityHeader.vue';
import { usePropertiesStore } from './stores/properties';
import { useEntityStore } from './stores/entity';
import { JavaEntity } from './scripts/codeTypes';
import { ref } from 'vue';

const code = ref('');
const propertiesStore = usePropertiesStore();
const entityStore = useEntityStore();

function createCode(){
  const properties = propertiesStore.properties;
  const entityName = entityStore.name;
  const tableName = entityStore.table;
  const packageName = entityStore.packageName;
  const entity = new JavaEntity(entityName, properties, tableName, packageName);
  code.value = entity.toString();
}

</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-row flex-wrap py-4">
      <div class="w-full content-center items-center text-center mb-2">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-500">
            R2DBC-Tools
          </span>
        </h1>
      </div>
      <aside class="w-full sm:w-1/3 md:w-1/3 px-2">
        <div class="sticky top-0 p-4 w-full border-2 border-zinc-500 rounded-2xl">
          <div class="tems-center content-center text-center mb-3 w-full">
            <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg w-36" 
            @click="createCode">Generate Code</button>
          </div>
          
          <EntityHeader />
          <Params />
        </div>
      </aside>
      <main role="main" class="w-full sm:w-2/3 md:w-2/3 pt-1 px-2 border-2 border-zinc-500 rounded-2xl">
        <EntityCode :code="code"/>
      </main>
    </div>
  </div>
  <footer class="mt-auto">
    ...
  </footer>
</template>
