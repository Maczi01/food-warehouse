const NewItemBar = ({ pageContext, isVisible, addItem, handleClose }) => (
    <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
        <Heading big>Create new {pageContext}</Heading>
        <Formik
            initialValues={{ title: '', content: '', articleUrl: '', twitterName: '', created: '' }}
            onSubmit={values => {
                addItem(pageContext, values);
                handleClose();
            }}
        >
            {({ values, handleChange, handleBlur }) => (
                <StyledForm>
                    <StyledInput
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                    />
                    {pageContext === 'twitters' && (
                        <StyledInput
                            placeholder="twitter name eg. hello_roman"
                            type="text"
                            name="twitterName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.twitterName}
                        />
                    )}
                    {pageContext === 'articles' && (
                        <StyledInput
                            placeholder="link"
                            type="text"
                            name="articleUrl"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.articleUrl}
                        />
                    )}
                    <StyledTextArea
                        name="content"
                        as="textarea"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.content}
                    />
                    <Button type="submit" activecolor={pageContext}>
                        Add Note
                    </Button>
                </StyledForm>
            )}
        </Formik>
    </StyledWrapper>
);
