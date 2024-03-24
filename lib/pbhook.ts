import PocketBase from 'pocketbase';
const pb = new PocketBase('https://path-choice.pockethost.io');

export const login = async function(data: any, setError?: any): Promise<boolean>{
  try{
    const authData = await pb.collection('users').authWithPassword(data.username, data.password);
    return !!authData.record;
  }catch(error: any){
    console.error('Error occurred during login up:', error);
    setError(error.toString());
    return false; // Return false in case of error
  }
}

export const signUp = async (data: any, setError?: any): Promise<boolean> => {
  try {
    const record = await pb.collection('users').create(data);

    // (optional) send an email verification request
    await pb.collection('users').requestVerification(data.email);

    return !!record.collectionId; // Convert to boolean
  } catch (error: any) {
    console.error('Error occurred during sign up:', error);
    setError(error.toString() + "Try Another Email or Username");
    return false; // Return false in case of error
  }
};

export const getUser = async function (){
  return pb.authStore;
}

export const logout = async function(){
  pb.authStore.clear();
}

export const addNewCategory = async function(data: any){
  try{
    const record = await pb.collection('categories').create(data);
    return !!record.collectionId;
  }catch(err){
    console.log(err)
  }
}

export const addNewExpense = async function(data: any){
  try{  
    const record = await pb.collection('expenses').create(data);
    return !!record.collectionId;
  }catch(err){
    console.log(err)
  }
}

export const getAllCategory = async function(){
  try{
    const records = await pb.collection('categories').getFullList({
      filter: `user="${(await getUser()).model?.id}"`
    });
    return records;
  }catch(err){
    return [];
  }
}

export const getAllExpenses = async function(){
  try{
    const records = await pb.collection('expenses').getFullList({
      filter: `user="${(await getUser()).model?.id}"`
    });
    return records;
  }catch(err){
    return [];
  }
}


export default pb;