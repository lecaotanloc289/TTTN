import React from 'react'
import CustomInput from '../components/CustomInput'

const Category = () => {
    return (
        <div>
            <h3 className="mb-4 title">Add category</h3>
            <form action="" method="post">
                <CustomInput type="text" label="Enter category name" />
                <button
                    type="submit"
                    className="border-0 rounded-3 btn btn-success mt-3"
                >
                    Add category
                </button>
            </form>
        </div>
    )
}

export default Category
