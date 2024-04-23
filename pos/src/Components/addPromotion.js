import React, { useState } from 'react';
import "./addPromotion.css";

function PromotionForm() {
    const [promotion, setPromotion] = useState({
        title: '',
        description: '',
        discount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any action with the promotion data here, like sending it to an API
        console.log('Submitted Promotion:', promotion);
        // Reset the form after submission
        setPromotion({
            title: '',
            description: '',
            discount: '',
        });
    };

    return (
        <div className="promotion-form-container">
            <h2 className="form-title">Add Promotion</h2>
            <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Promotion Id:</label>
                    <input
                        type="text"
                        name="title"
                        value={promotion.title}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Payment Method:</label>
                    <textarea
                        name="description"
                        value={promotion.description}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Promotion Count:</label>
                    <input
                        type="text"
                        name="discount"
                        value={promotion.discount}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Edit:</label>
                    <input
                        type="text"
                        name="discount"
                        value={promotion.discount}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label"> Data:</label>
                    <input
                        type="text"
                        name="discount"
                        value={promotion.discount}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="form-button">Add Promotion</button>
                <button type="submit" className="form-button">Add Promotion</button>
            </form>
        </div>
    );
}

export default PromotionForm;
