import React, { useEffect, useState } from 'react'
import{
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery
} from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'
import {toast} from 'react-toastify'
import AdminMenu from './AdminMenu'

function CategoryList() {


  const {data:categories,refetch: refetchCategories}=useFetchCategoriesQuery()
  // console.log(categories)
  
  const [name,setName]=useState("")
  const[modalvisible,setModalVisible]=useState(false)
  const [selectedCategory,setSelectedcategory]=useState(null)
  const[updatingName,setUpdatingName]=useState("")

  const[createCategory]=useCreateCategoryMutation()
  const[updateCategory]=useUpdateCategoryMutation()
  const [deleteCategory]=useDeleteCategoryMutation()


  const handleCreateCategory=async(e)=>{
      e.preventDefault()

      if(!name){
         toast.error("category name is required")
         return
      }

      try {
        const result= await createCategory({name}).unwrap()
        if(result.error){
          toast.error(result.error)
        }else{
          setName()
          toast.success(`${result.name} is created.`)
          refetchCategories();

        }
        
      } catch (error) {
        console.log(error);
        toast.error("Creating category failed,try agin.")
      }
  }

  const handleUpdateCategory= async(e)=>{
     e.preventDefault()

     if(!updatingName){
      toast.error("Category name is required")
      return
     }

     try {
       const result=await updateCategory({
        categoryId:selectedCategory._id,
        updatedCategory:{
          name:updatingName,
        }
       }).unwrap()

       if(result.error){
        toast.error(result.error)
       }else{
        toast.success(`${result.name} is updated`)
        setSelectedcategory(null)
        setUpdatingName()
        setModalVisible(false)
        refetchCategories()
       }
     } catch (error) {
       console.log(error);
     }
  }

  const handleDeleteCategory=async()=>{
      try {
        const result=await deleteCategory(selectedCategory._id).unwrap()

        if(result.error){
          toast.error(result.error)
        }else{
          toast.success(`${result.name} is deleted.`)
          setSelectedcategory(null)
          setModalVisible(false)
          refetchCategories()
        }
      } catch (error) {
        console.log(error);
        toast.error("category deletion failed.try again.")
      }
  }




  return (
    <div className=' ml-[10rem] flex flex-col md:flex-row font-poppins'>
      <AdminMenu/>
      <div className=' md:w-3/4 p-3'>
          <div className=' h-12 font-bold text-xl'>Manage Categories</div>
          <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
          />
          <br />
          <hr />

          <div className=' flex flex-wrap'>
               {
                  categories ?.map((category)=>(
                    <div key={category._id}>
                         <button
                             className=' bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-pink-500 focus:ring-opacity-50'
                             onClick={()=>{
                                 setModalVisible(true)
                                 setSelectedcategory(category)
                                 setUpdatingName(category.name)
                             }}
                          >
                             {category.name}
                          </button>
                     </div>
                  ))
                }
           </div>
           <Modal 
               isOpen={modalvisible}
               onClose={()=>setModalVisible(false)}
            >
              <CategoryForm
                  value={updatingName}
                  setValue={(value)=>setUpdatingName(value)} 
                  handleSubmit={handleUpdateCategory}
                  buttonText='Update'
                  handleDelete={handleDeleteCategory}
              />
           </Modal>
      </div>
         
    </div>
  )
}

export default CategoryList

