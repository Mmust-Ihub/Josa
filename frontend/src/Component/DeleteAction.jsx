/* eslint-disable react/prop-types */
import Swal from 'sweetalert2';
import { TrashIcon } from '@heroicons/react/24/outline'



export default function DeleteAction({slug}) {

    const handleDelete = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform the action here, e.g., deleting a record
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          }
        });
      };

   

  return (
    <form action={''} className='bg-rose-500 p-2 text-white text-sm rounded-md w-full flex items-center justify-center'>
  
    <button onClick={handleDelete}>
    <div>
      <TrashIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
      <p className='hidden lg:block text-xs'>
      Delete
      </p>
    </div>
    
    </button>     
      </form>
)
}
